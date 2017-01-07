class DropboxController < ApplicationController

  include EncryptionHelper

  before_action {
    if params[:user_uuid]
      @user = User.find_by_uuid(params[:user_uuid])
    end
  }

  def show
    if !@user
      render :json => {:error => "Unable to load extension."}
    end

    key = params[:key]

    name = "Dropbox Sync"
    supported_types = ["Note"]
    actions = [
      {
        :label => "Auto-push changes",
        :desc => "Pushes item changes to Dropbox folder.",
        :url => "http://localhost:3002/ext/dropbox/#{@user.uuid}/push?key=#{key}",
        :verb => "post",
        :repeat_mode => "watch",
        :repeat_timeout => 7,
        :context => "global",
        :content_types => ["*"],
        :permissions => "read",
        :accepts_decrypted => true,
        :accepts_encrypted => true
      },
      {
        :label => "Perform initial sync",
        :desc => "Syncs all your current items. This can take several minutes, depending on how many items you have.",
        :url => "http://localhost:3002/ext/dropbox/#{@user.uuid}/initial_sync?key=#{key}",
        :verb => "post",
        :context => "global",
        :content_types => ["*"],
        :all => true,
        :permissions => "read",
        :accepts_decrypted => true,
        :accepts_encrypted => true
      },
      {
        :label => "Save to Dropbox",
        :desc => "Syncs this item to Dropbox.",
        :url => "http://localhost:3002/ext/dropbox/#{@user.uuid}/push_one?key=#{key}",
        :verb => "post",
        :context => "Item",
        :content_types => ["*"],
        :permissions => "read",
        :accepts_decrypted => true,
        :accepts_encrypted => true
      },
      {
        :label => "Download import file",
        :desc => "Downloads import file in standard format.",
        :url => "http://localhost:3002/ext/dropbox/#{@user.uuid}/download?key=#{key}",
        :context => "global",
        :verb => "show"
      }
    ]
    render :json => {:name => name, :supported_types => supported_types, :actions => actions}
  end

  def dropbox
    if @dropbox
      return @dropbox
    end

    require 'dropbox'
    key = params[:key]
    dropbox_token = EncryptionHelper.decrypt(@user.enc_dropbox_token, key)
    @dropbox = Dropbox::Client.new(dropbox_token)
  end

  def push
    items = params[:items]

    # write individual files
    items.each do |item|
      dropbox.upload("/#{item[:uuid]}.txt", "#{JSON.pretty_generate(item.as_json)}", {:mode => "overwrite"})
    end

    # write to master file
    begin
      file, body = dropbox.download("/master.txt")
      contents = JSON.parse(body.to_s)
    rescue
      contents = {"items" => []}
    end

    items.each do |item|
      existing = contents["items"].find { |e| e["uuid"] == item[:uuid]  }
      if existing
        existing.clear
        existing.merge!(item.to_unsafe_h)
      else
        contents["items"].push(item.to_unsafe_h)
      end
    end

    dropbox.upload("/master.txt", JSON.pretty_generate(contents.as_json), {:mode => "overwrite"})

    render :json => {:success => true}
  end

  def push_one
    params[:items] = [params[:item]]
    self.push
  end

  def initial_sync
    self.push
  end

  def download
    file, body = dropbox.download("/master.txt")
    send_data body.to_s, filename: "dropbox-notes.txt"
  end


  def dropbox_auth_complete
    @user = User.new
    code = params[:code]

    require 'dropbox'

    url = "https://api.dropboxapi.com/1/oauth2/token"
    request_params = {
      :code => code,
      :grant_type => "authorization_code",
      :client_id => ENV["DROPBOX_CLIENT_ID"],
      :client_secret => ENV["DROPBOX_CLIENT_SECRET"],
      :redirect_uri => "http://localhost:3002/dropbox_redirect"
      }

    resp = HTTP.headers(content_type: 'application/json').post(url, :params => request_params)

    if resp.code != 200
      @error = "Unable to authenticate. Please try again."
      redirect_to "/extensions/dropbox?secret_url=error"
    else
      data = JSON.parse(resp.to_s)

      # encrypt token before storing. do not save key.
      # return key to user for safe storing

      dropbox_token = data["access_token"]
      key = EncryptionHelper.generate_random_key
      encrypted_token = EncryptionHelper.encrypt(dropbox_token, key)

      puts "Token: #{dropbox_token}"
      puts "Encrypted token: #{encrypted_token}"

      @user.enc_dropbox_token = encrypted_token
      @user.save!

      @secret_url = "http://localhost:3002/ext/dropbox/#{@user.uuid}?key=#{key}"
      redirect_to "/extensions/dropbox?secret_url=#{@secret_url}"
    end

  end
end

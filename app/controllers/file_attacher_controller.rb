class FileAttacherController < ApplicationController

  include DropboxHelper

  def register
    @user = ExtensionUser.new
    key = EncryptionHelper.generate_random_key
    payload = {hashed_key: EncryptionHelper.sha256(key)}
    @user.payload = payload.to_json
    @user.save

    @secret_url = "#{ENV['HOST']}/ext/file_attacher/#{@user.uuid}?key=#{key}"
    redirect_to "/extensions/file_attacher?secret_url=#{@secret_url}"
  end


  before_action {
    if params[:user_uuid]
      @user = ExtensionUser.find_by_uuid(params[:user_uuid])
    end
  }

  def show
    if !@user
      render :json => {:error => "Unable to load extension."}
    end

    key = params[:key]
    item_uuid = params[:item_uuid]

    name = "File Attacher"
    supported_types = ["Note"]
    actions = [
      {
        :label => "Attach file",
        :desc => "Attach a new file to this note.",
        :url => "#{ENV['HOST']}/ext/file_attacher/#{@user.uuid}/attach?key=#{key}&item_uuid=#{item_uuid}",
        :verb => "show",
        :context => "Item",
        :content_types => ["Note"]
      }
    ]

    if item_uuid != nil
      begin
        files = dropbox.list_folder("/file_attacher/#{item_uuid}")
        files.each do |file|
          action = {
            :label => "Download #{file.name}",
            :desc => "",
            :url => "#{ENV['HOST']}/ext/file_attacher/#{@user.uuid}/download?key=#{key}&file_path=#{file.path_lower}",
            :verb => "show",
            :context => "Item",
            :content_types => ["Note"]
          }
          actions.push(action)
        end

        if files.length > 0
          actions.push({
            :label => "Manage attachments",
            :desc => "",
            :url => "#{ENV['HOST']}/ext/file_attacher/#{@user.uuid}/files?key=#{key}&item_uuid=#{item_uuid}",
            :verb => "show",
            :context => "Item",
            :content_types => ["Note"]
            })
        end
      rescue
        # no files found
      end
    end

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

  def attach
    respond_to do |format|
      format.html
    end
  end

  def upload
    uploaded_io = params[:file]
    dropbox.upload("/file_attacher/#{params[:item_uuid]}/#{uploaded_io.original_filename}", uploaded_io.read, {:mode => "overwrite"})
    redirect_to files_path(request.parameters)
  end

  def files
    item_uuid = params[:item_uuid]
    begin
      @files = dropbox.list_folder("/file_attacher/#{item_uuid}")
    rescue
      @files = []
    end
  end

  def download
    file, body = dropbox.download("#{params[:file_path]}")
    send_data body.to_s, filename: file.name
  end

  def delete
    dropbox.delete("#{params[:file_path]}")
    redirect_to files_path(request.parameters)
  end

end

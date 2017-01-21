module DropboxHelper
  include EncryptionHelper

  def self.get_access_key(auth_code, redirect)
    require 'dropbox'

    url = "https://api.dropboxapi.com/1/oauth2/token"
    request_params = {
      :code => auth_code,
      :grant_type => "authorization_code",
      :client_id => ENV["DROPBOX_CLIENT_ID"],
      :client_secret => ENV["DROPBOX_CLIENT_SECRET"],
      :redirect_uri => "#{ENV['HOST']}/#{redirect}"
      }

    resp = HTTP.headers(content_type: 'application/json').post(url, :params => request_params)

    puts "\n\n\n"
    puts resp
    puts "\n\n\n"

    if resp.code != 200
      @error = "Unable to authenticate. Please try again."
      return {:error => @error}
    else
      data = JSON.parse(resp.to_s)
      dropbox_token = data["access_token"]
      key = EncryptionHelper.generate_random_key
      encrypted_token = EncryptionHelper.encrypt(dropbox_token, key)
      return {:token => dropbox_token, :encrypted_token => encrypted_token, :key => key}
    end

  end

end

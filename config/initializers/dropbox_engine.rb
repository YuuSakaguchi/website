DropboxEngineMountPath = "extensions/dropbox_store"
DropboxSync.mount_url = "#{ENV['HOST']}/#{DropboxEngineMountPath}"
DropboxSync.db_client_id = ENV["DROPBOX_CLIENT_ID"]
DropboxSync.db_client_secret = ENV["DROPBOX_CLIENT_SECRET"]

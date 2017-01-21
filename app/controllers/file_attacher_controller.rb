class FileAttacherController < ApplicationController

  include DropboxHelper

  def register
    @user = User.new
    key = EncryptionHelper.generate_random_key
    payload = {hashed_key: EncryptionHelper.sha256(key)}
    @user.payload = payload.to_json
    @user.save

    @secret_url = "#{ENV['HOST']}/ext/file_attacher/#{@user.uuid}?key=#{key}"
    redirect_to "/extensions/file_attacher?secret_url=#{@secret_url}"
  end

  # def dropbox_auth_complete
  #   @user = User.find_by_uuid(params[:state])
  #   code = params[:code]
  #
  #   result = DropboxHelper.get_access_key(code, "fa_dropbox_redirect")
  #   if result[:error]
  #     redirect_to "/extensions/file_attacher?secret_url=error"
  #   else
  #     @user.enc_dropbox_token = result[:encrypted_token]
  #     @user.save!
  #
  #     redirect_to "/extensions/file_attacher?secret_url=#{@secret_url}"
  #   end
  # end

end

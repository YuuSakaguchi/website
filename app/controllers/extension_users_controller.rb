class ExtensionUsersController < ApplicationController

  before_action {
    uuid = params[:uuid]
    key = params[:key]
    @user = ExtensionUser.find_by_uuid(uuid)
    if !@user
      return render :status => 404
    end
    payload = JSON.parse(@user.payload)
    if payload["hashed_key"] != EncryptionHelper.sha256(key)
      render :status => 401
      return
    end
  }

  def show
    render :json => @user
  end

  def update
    @user.update(u_params)
    if params[:dropbox_token]
      # encrypt token before updating
      encrypted_token = EncryptionHelper.encrypt(params[:dropbox_token], params[:key])
      @user.enc_dropbox_token = encrypted_token
    end
    @user.save
    render :json => @user
  end

  private

  def u_params
    params.permit()
  end

end

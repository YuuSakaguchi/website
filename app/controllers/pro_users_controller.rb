class ProUsersController < ApplicationController

  include ExtensionServerHelper

  before_action :authenticate_pro_user, :only => [:update, :show, :index]

  def create
    pro_user = ProUser.find_by_email(params[:email])
    if pro_user
      if !pro_user.subscription || (pro_user.subscription && pro_user.subscription.valid == false)
        render :json => {:status => "expired", :user => json_for_user(pro_user), :token => jwt(pro_user)}
      else
        # send login email
        ProUserMailer.login(pro_user, jwt(pro_user)).deliver_later
        render :json => {:status => "login-email-sent"}
      end
      return
    end

    pro_user = ProUser.create({email: params[:email]})
    create_user_on_extensions_server(pro_user)
    render :json => {:status => "did-register", :user => json_for_user(pro_user), :token => jwt(pro_user)}
  end

  def json_for_user(user)
    user_json = user.as_json
    user_json[:extension_server_url] = user.extension_server_url
    user_json
  end

  def update
    current_user.update!(user_params)
  end

  def index
    render :json => current_user, :methods => [:extension_server_url], :include => {:subscription => {:methods => [:valid]}}
  end

  def show
    render :json => current_user, :methods => [:extension_server_url], :include => {:subscription => {:methods => [:valid]}}
  end

  def jwt(user)
    JwtHelper.encode({:user_id => user.id, :valid_until => Time.now + 2.hours})
  end

  private

  def user_params
    params.permit(:email, :name, :website)
  end

  def create_user_on_extensions_server(user)
    ExtensionServerHelper.create_user(user)
  end

end

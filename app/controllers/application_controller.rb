class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  after_action :set_csrf_cookie
  attr_accessor :current_user

  layout :resolve_layout

  def main
    set_app_domain
  end

  rescue_from ActionView::MissingTemplate do |exception|

  end

  def authenticate_pro_user
    token = params[:jwt]
    claims = JwtHelper.decode(token) rescue nil
    valid_until = claims[:valid_until].to_time

    if valid_until.past?
      render_unauthorized
      return
    end

    self.current_user = ProUser.find claims['user_id']
    if !self.current_user
      render_unauthorized
    end
  end

  private

  def resolve_layout
     case action_name
     when "main"
       false
     else
       "application"
     end
  end

  def render_unauthorized
    render :json => {:error => {:message => "Unauthorized."}}, :status => 401
  end

  protected

  def set_app_domain
    @appDomain = request.domain
    @appDomain << ':' + request.port.to_s unless request.port.blank?
  end
  def set_csrf_cookie
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end

end

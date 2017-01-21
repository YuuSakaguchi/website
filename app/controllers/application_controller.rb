class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  after_action :set_csrf_cookie

  layout :resolve_layout

  def main
    set_app_domain
  end

  rescue_from ActionView::MissingTemplate do |exception|

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

  protected

  def set_app_domain
    @appDomain = request.domain
    @appDomain << ':' + request.port.to_s unless request.port.blank?
  end
  def set_csrf_cookie
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end

end

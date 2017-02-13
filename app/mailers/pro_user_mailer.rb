class ProUserMailer < ApplicationMailer

  def login(user, jwt)
    @link = "#{ENV["HOST"]}/pro-dashboard?jwt=#{jwt}"
    mail(to: user.email, subject: "Standard Notes Pro Login Link")
  end
end

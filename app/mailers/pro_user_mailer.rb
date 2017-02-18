class ProUserMailer < ApplicationMailer

  def login(user, jwt)
    @link = "#{ENV["HOST"]}/subscriber-dashboard?jwt=#{jwt}"
    mail(to: user.email, subject: "Standard Notes Extended Login Link")
  end
end

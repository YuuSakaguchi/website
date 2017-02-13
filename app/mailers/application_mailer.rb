class ApplicationMailer < ActionMailer::Base
  default from: 'Standard Notes <hello@standardnotes.org>'
  layout 'mailer'
end

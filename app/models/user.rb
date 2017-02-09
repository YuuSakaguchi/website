class User < ApplicationRecord
  include UuidHelper
  has_one :subscription

  def as_json(options)
    result = super(options)
    result[:dropbox_linked] = self.enc_dropbox_token != nil
    result
  end

end

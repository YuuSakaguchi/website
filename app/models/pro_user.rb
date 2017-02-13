class ProUser < ApplicationRecord
  has_one :subscription

  include ExtensionServerHelper

  def extension_server_url
    return "#{ExtensionServerHelper.extension_server_url}/#{self.extension_server_key}/#{self.email}"
  end
end

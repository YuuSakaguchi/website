module ExtensionServerHelper
  require 'net/http'
  require 'uri'

  def self.extension_server_url
    return "#{ENV["EXT_SERVER_URL"]}"
  end

  def self.create_user(user)
    self.post_user(user, {:email => user.email})
  end

  def self.set_user_pro_enabled(user, pro_enabled)
    self.post_user(user, {:email => user.email, :pro_enabled => pro_enabled})
  end

  def self.post_user(user, params)
    url = "#{ENV["EXT_SERVER_URL"]}/users"
    uri = URI.parse(url)

    http = Net::HTTP.new(uri.host, uri.port)
    req = Net::HTTP::Post.new(uri.request_uri, 'Content-Type' => 'application/json')
    req.body = params.merge({:client_secret => ENV['EXT_CLIENT_SECRET']}).to_json
    http.use_ssl = (uri.scheme == "https")
    response = http.request(req)

    if response.code[0] == "2"
      response_user = JSON.parse(response.body)
      user.extension_server_key = response_user["key"]
      user.save
    end
  end

end

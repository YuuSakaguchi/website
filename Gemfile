source 'https://rubygems.org'

gem 'rails', '5.0.1'

gem 'mysql2', '>= 0.3.13', '< 0.5'

gem 'dropbox-sdk-v2'

gem 'sass'

gem "non-stupid-digest-assets"

gem 'jwt'

gem 'uglifier'

gem 'rack-cors', :require => 'rack/cors'

gem 'dotenv-rails', '~> 2.1.1'

gem 'bower-rails', '~> 0.10.0'

gem 'stripe'

# Used for 'respond_to' feature
gem 'responders', '~> 2.0'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'

  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'

  gem 'puma'

  gem 'sinatra', github: 'sinatra' # for use by mailcatcher
  gem 'mailcatcher'

  # Deployment tools
  gem 'capistrano'
  gem 'capistrano-bundler'
  gem 'capistrano-passenger', '>= 0.2.0'
  gem 'capistrano-rails'
  gem 'capistrano-rvm'
  gem 'capistrano-sidekiq'
  gem 'capistrano-git-submodule-strategy', '~> 0.1.22'
end

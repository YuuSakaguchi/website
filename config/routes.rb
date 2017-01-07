Rails.application.routes.draw do
  get "ext/dropbox/:user_uuid" => "dropbox#show"
  post "ext/dropbox/:user_uuid/push" => "dropbox#push"
  post "ext/dropbox/:user_uuid/push_one" => "dropbox#push_one"
  post "ext/dropbox/:user_uuid/initial_sync" => "dropbox#initial_sync"
  get "ext/dropbox/:user_uuid/download" => "dropbox#download"

  get "dropbox_redirect" => "dropbox#dropbox_auth_complete"

  get '*path' => 'application#main'
  root 'application#main'
end

Rails.application.routes.draw do

  # dropbox ext
  get "ext/dropbox/:user_uuid" => "dropbox#show"
  post "ext/dropbox/:user_uuid/push" => "dropbox#push"
  post "ext/dropbox/:user_uuid/push_one" => "dropbox#push_one"
  post "ext/dropbox/:user_uuid/initial_sync" => "dropbox#initial_sync"
  get "ext/dropbox/:user_uuid/download" => "dropbox#download"

  get "dropbox_redirect" => "dropbox#dropbox_auth_complete"

  # file attacher ext
  get "ext/file_attacher/register" => "file_attacher#register"
  get "ext/file_attacher/:user_uuid" => "file_attacher#show"
  get "ext/file_attacher/:user_uuid/attach" => "file_attacher#attach"
  get "ext/file_attacher/:user_uuid/files" => "file_attacher#files", :as => "files"
  post "ext/file_attacher/:user_uuid/upload" => "file_attacher#upload"
  get "ext/file_attacher/:user_uuid/download" => "file_attacher#download"
  delete "ext/file_attacher/:user_uuid" => "file_attacher#delete"

  get "api/users/:uuid" => "users#show"
  patch "api/users/:uuid" => "users#update"

  get '*path' => 'application#main'
  root 'application#main'
end

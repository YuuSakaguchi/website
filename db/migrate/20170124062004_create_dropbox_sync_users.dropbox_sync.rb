# This migration comes from dropbox_sync (originally 20170124051910)
class CreateDropboxSyncUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :dropbox_sync_users do |t|
      t.string :uuid
      t.string :hashed_key
      t.string :enc_dropbox_token
      t.timestamps
    end
  end
end

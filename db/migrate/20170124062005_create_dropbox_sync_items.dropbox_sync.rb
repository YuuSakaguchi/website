# This migration comes from dropbox_sync (originally 20170124051915)
class CreateDropboxSyncItems < ActiveRecord::Migration[5.0]
  def change
    create_table :dropbox_sync_items do |t|
      t.string :uuid
      t.string :user_uuid
      t.boolean :deleted, :default => false
      t.timestamps
    end
  end
end

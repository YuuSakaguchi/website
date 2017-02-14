class CreateProUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :pro_users do |t|
      t.string :stripe_id
      t.string :email
      t.string :name
      t.string :website
      t.string :extension_server_key

      t.timestamps
    end

    add_index :pro_users, :stripe_id, :unique => true
    add_index :pro_users, :email, :unique => true
  end
end

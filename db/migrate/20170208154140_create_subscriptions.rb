class CreateSubscriptions < ActiveRecord::Migration[5.0]
  def change

    create_table :subscriptions do |t|
      t.string :stripe_id
      t.string :stripe_name

      t.string :user_stripe_id
      t.string :user_email
      t.string :user_name
      t.string :user_website

      t.boolean :anon_contrib

      t.string :payment_type
      t.datetime :active_until

      t.boolean :canceled, :default => false

      t.timestamps null: false
    end

    add_index :subscriptions, :user_stripe_id, :unique => true

  end
end

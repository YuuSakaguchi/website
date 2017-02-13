class CreateSubscriptions < ActiveRecord::Migration[5.0]
  def change

    create_table :subscriptions do |t|
      t.string :stripe_id
      t.string :stripe_name

      t.integer :pro_user_id

      t.string :payment_type
      t.datetime :active_until

      t.boolean :canceled, :default => false

      t.timestamps null: false
    end

  end
end

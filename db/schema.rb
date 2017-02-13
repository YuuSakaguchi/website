# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170212152031) do

  create_table "extension_users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "email"
    t.string   "uuid"
    t.string   "enc_dropbox_token"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.text     "payload",           limit: 65535
  end

  create_table "pro_users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "stripe_id"
    t.string   "email"
    t.string   "name"
    t.string   "website"
    t.string   "extension_server_key"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
    t.index ["email"], name: "index_pro_users_on_email", unique: true, using: :btree
    t.index ["stripe_id"], name: "index_pro_users_on_stripe_id", unique: true, using: :btree
  end

  create_table "subscriptions", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "stripe_id"
    t.string   "stripe_name"
    t.integer  "pro_user_id"
    t.string   "payment_type"
    t.datetime "active_until"
    t.boolean  "canceled",     default: false
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
  end

end

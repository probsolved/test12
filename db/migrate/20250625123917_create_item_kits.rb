class CreateItemKits < ActiveRecord::Migration[8.0]
  def change
    create_table :item_kits do |t|
      t.references :item, null: false, foreign_key: true
      t.references :kit, null: false, foreign_key: true

      t.timestamps
    end
  end
end

class Item < ApplicationRecord
  belongs_to :category
  has_many :item_kits, dependent: :destroy
  has_many :kits, through: :item_kits
end

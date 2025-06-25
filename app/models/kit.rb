class Kit < ApplicationRecord
  belongs_to :user
  has_many :item_kits, dependent: :destroy
  has_many :items, through: :item_kits
end

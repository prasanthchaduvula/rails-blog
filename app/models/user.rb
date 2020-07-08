class User < ApplicationRecord
  before_save { self.email = email.downcase }
  has_many :articles, dependent: :destroy
  validates :name, presence: true, length: { minimum: 3, maximum: 25 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, uniqueness: { case_sesitive: false },
                    length: { maximum: 250 }, 
                    format: { with: VALID_EMAIL_REGEX }
  # validates :password, presence: true, length: { minimum: 6}
  has_secure_password
end
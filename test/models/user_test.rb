require 'test_helper'

class UserTest < ActiveSupport::TestCase

  def setup
    @user = User.new(name: "prasanth", email: "prasanth@gmail.com", 
                      password: "password")
  end

  test "user should be valid" do
    assert @user.valid?
  end

  test "name should be present" do
    @user.name = " "
    assert_not @user.valid?
  end

  test "name should be not be too short" do
    @user.name = "a" * 2
    assert_not @user.valid?
  end

  test "name should be not too long" do
    @user.name = "a" * 26
    assert_not @user.valid?
  end

end
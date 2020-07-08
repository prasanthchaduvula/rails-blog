class UsersController < ApplicationController

  before_action :set_user, only: [:show, :edit, :update, :destroy]
  before_action :require_user, only: [:edit, :update]
  before_action :require_same_user, only: [:edit, :update, :destroy]

  def index
    @users = User.all
  end

  def show 
    @articles = @user.articles
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      render status: :ok, json: { notice: 'Account created successfully!' }
    else      
      render status: :unprocessable_entity, 
      json: { errors: @user.errors.full_messages}    
    end
  end


  def edit
  end


  def update
    if @user.update(user_params)
      render status: :ok, json: {notice: "User updated successfully"}
    else
      render status: :unprocessable_entity,
      json: {errors: @user.errors.full_messages }
      end
  end

  def destroy
    if @user.destroy
      session[:user_id] = nil if @user == current_user
      render status: :ok, json: {notice: "Sucessfully deleted profile"}
    else
      render status: :unprocessable_entity,
      json: {errors: @user.errors.full_messages}
    end
  end

  private


  def set_user
    @user = User.find(params[:id])
  end


  def user_params
    params.require(:user).permit(:name, :email, :password)
  end

  def require_same_user
    if current_user != @user && !current_user.admin?
      flash[:alert] = "You can only edit your own account"
      redirect_to @user
    end
  end
end
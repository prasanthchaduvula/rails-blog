class CategoriesController < ApplicationController


  before_action :set_category, only: [:show, :edit, :update]
  before_action :require_admin, except: [:index, :show]
  
  def show
    @articles = @category.articles
  end


  def new
    @category = Category.new
  end


  def index
    @categories = Category.all
  end

  def create
    @category = Category.new(category_params)
    if @category.save
      render status: :ok, json: {notice: "created successfully"}
    else
      render status: :unprocessable_entity, 
      json: { errors: @category.errors.full_messages} 
    end
  end

  def edit
  end

  def update
    if @category.update(category_params)
      render status: :ok, json: {notice: "updated successfully"}
    else
      render status: :unprocessble_entity, 
      json: {error: "updating catgeory failed"}
    end
  end

  private

  def set_category
    @category = Category.find(params[:id])
  end

  def category_params
    params.require(:category).permit(:name)
  end

  def require_admin
    if !(logged_in? && current_user.admin?)
      flash[:alert] = "You should be admin"
      redirect_to categories_path
    end
  end

end
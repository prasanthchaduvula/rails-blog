class ArticlesController < ApplicationController


  before_action :set_article, only: [:show, :edit, :update, :destroy]
  before_action :require_user, except: [:show, :index]
  before_action :required_same_user, only: [:edit, :update, :destroy]

  def show 
    @user = @article.user
  end

  def index
    @articles = Article.all
  end

  def new
    @article = Article.new
    @categories = Category.all
  end

  def create
    @article = Article.new(article_params)
    @article.user = current_user
    if @article.save
      render status: :ok, json: { notice: 'Article created successfully!' }
    else      
      render status: :unprocessable_entity, 
      json: { errors: @article.errors.full_messages}    
    end
  end

  def edit
  end

  def update
    if @article.update(article_params)
      render status: :ok, json: {notice: "Article updated successfully"}
    else
      render status: :unprocessable_entity,
      json: {errors: @article.errors.full_messages}
    end
  end

  def destroy
    if @article.destroy
      render status: :ok, json: {notice: "Deleted success"}
    else 
      render status: :unprocessable_entity,
      json: {errors: "Delete failed"}
    end
  end


  private

  def set_article
    @article = Article.find(params[:id])
  end

  def article_params
    params.require(:article).permit(:title, :description, category_ids: [])
  end

  def required_same_user
    if current_user != @article.user && !current_user.admin?
      flash[:alert] = "You can only edit or delete your articles"
      redirect_to @article
    end
  end

end
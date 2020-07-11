class PagesController < ApplicationController
  
  def home
    @articles = Article.all
  end

  def show
    
  end

end
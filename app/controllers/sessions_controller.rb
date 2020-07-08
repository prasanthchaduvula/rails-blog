class SessionsController < ApplicationController

  def new 
  end


  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      session[:user_id] = user.id
      render status: :ok, json: {notice: "logged successfully"}
    else
      render status: :unprocessable_entity, 
      json: { errors: "something wrong in your login details"} 
    end   
  end

  def destroy
    session[:user_id] = nil
    render status: :ok, json: {notice: "loggedout successfully"}
  end

end
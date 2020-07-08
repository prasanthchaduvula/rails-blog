json.articles @articles do |article|
  json.name article.user.name
  json.article article
  json.current_user current_user
  json.logged_in logged_in?
end

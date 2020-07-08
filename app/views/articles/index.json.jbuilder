json.articles @articles do |article|
  json.name article.user.name
  json.article article
end
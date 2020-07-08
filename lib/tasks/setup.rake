task setup_admin: [:environment] do
 create_admin
  puts "admin created"
end


def create_admin 
  User.create!(name:"admin", email:"admin@example.com",password:"password", admin: true)
end
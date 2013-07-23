require 'sinatra/base'
require 'csv'
require 'erb'

include ERB::Util

$FR_INDEX = "index-fr.csv"

class MyApp < Sinatra::Base
#  enable :sessions
  require './helpers'
	set :environment, :production

  get '/' do
  	erb :index, :locals => {:index => true, :classicDescription => true}
  end

  get '/:url' do
    postsIndex = nil
		post = nil
		locals = {}

		if params[:url] == "blog" then
      postsIndex = getPostsIndex
		  post = getPost postsIndex[0][2]
			locals[:classicDescription] = true # used to not change the html description
		else
		  if params[:url] =~ /[a-zA-Z0-9](-|[a-zA-Z0-9])*/ then
		    post = getPost params[:url]
		  else
			  not_found 
			end
		end

		if post.nil? then
	    not_found 
		end

    # when anything except /blog, should look for the index
		if postsIndex.nil? then
      postsIndex = getPostsIndex
		end
      
		locals[:postsIndex] = postsIndex
		locals[:post] = post

		erb :blog, :locals => locals
  end

	def getPostsIndex()
    return CSV.read $FR_INDEX, {:col_sep => ','}
	end

	def getPost(title)
		post = Array.new
		begin
			i = 0
	    File.open('posts/' + title + '.txt', 'r').each_line do |line|
        if i < 5 then
          post << line
		      i += 1	
		    else
			  	post[4] << line
			  end
			end
		rescue
		  post = nil
		end
	  return post	
	end

	not_found do 
    postsIndex = getPostsIndex
		erb :'404', :locals => {:postsIndex => postsIndex}
	end

	error do 
    postsIndex = getPostsIndex
		erb :'500', :locals => {:postsIndex => postsIndex}
	end

  run! if app_file == $0
end


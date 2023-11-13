COMPONENT/CRUD for create users + profiles

- const {data} = await supabase.auth.whatever()
- const user = data.session.user
- await supabase.from("profiles").insert({user_id: user.id, role: "recruite" / "job-seeker", ..... whatever })

// 13 Nov

profile CRUD page
read the id from the url and let user edit profile if its same

depend on profile.role show the profile like if it jobseeker or recruiter

get id from URL
fetch profile if its not found in slice
depending on profile.user_id === auth.user.id show editable
depending on profile.role show the relevant fields

who is this , what is their role, is it me?

AFTER ================
COMPONENT/CRUD for recruiter to make a job
COMPONENT/CRUD for job seeker to see jobs
COMPONENT/CRUD for all users to start / see conversations

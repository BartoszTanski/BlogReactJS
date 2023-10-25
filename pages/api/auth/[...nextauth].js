import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  // Configure one or more authentication providers
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: 'enter "js@gmail.com"' },
        password: { label: "Password", type: "password", placeholder: 'enter "password"'}
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
       
        if(credentials.email=="js@gmail.com"&&credentials.password=="password"){
          const user = { id: "1", name: "Jack Smith", image:"https://cdn.dribbble.com/users/5534/screenshots/14230133/media/e2f853f8232acad78bf143c32f2f3a04.jpg?compress=1&resize=400x300" , email: "jsmith@example.com"}
          return user;
        }
        else if (credentials.email==""||credentials.password=="")
          return null;
        else {
          const AUTH_URL=`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/auth/login`;
          const authRequest = new FormData();
          authRequest.append("email",credentials.email);
          authRequest.append("password",credentials.password);
          //authRequest.append("clientsecret",process.env.BLOG_CLIENT_SECRET);
          await axios.get(AUTH_URL,authRequest,{
            headers:{
              Accept:"application/json" 
            },})
          .then((res)=>{
            const user = res.data;
            return user
          })
          .catch((error)=>{
            console.log(error)
            return null;
          })
        }
      }
    })
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)
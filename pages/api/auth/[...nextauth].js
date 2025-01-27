import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',  
      credentials: {
        name: { label: "Name", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        
        const res = await fetch('http://localhost:3001/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: credentials.name,
            password: credentials.password
          })
        });

        const user = await res.json();

       
        if (res.ok && user) {
          return user; 
        }

        throw new Error(user?.message || 'Auth error!');
      }
    })
  ],
  session: {
    strategy: 'jwt',  
  },
  pages: {
    signIn: '/user/login',  
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.phone = user.phone;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.phone = token.phone;
      session.user.name = token.name;
      return session;
    }
  }
});

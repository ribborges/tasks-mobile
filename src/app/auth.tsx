import React, { useState } from 'react';

import Auth from '@/components/views/Auth';
import SignIn from '@/components/views/SignIn';
import TextLink from '@/components/TextLink';
import SignUp from '@/components/views/SignUp';

export default function AuthPage() {
    const [signIn, setSignIn] = useState(true);

    return (
        <Auth>
            {
                signIn ?
                    <>
                        <SignIn />
                        <TextLink onPress={() => setSignIn(!signIn)}>
                            Don't have an account yet? Sign up now!
                        </TextLink>
                    </>
                    :
                    <>
                        <SignUp />
                        <TextLink onPress={() => setSignIn(!signIn)}>
                            Already have an account? Sign in now!
                        </TextLink>
                    </>
            }
        </Auth>
    );
}

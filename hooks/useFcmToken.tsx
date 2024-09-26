'use client';

import { fetchToken, messaging } from "@/firebase";
import { onMessage, Unsubscribe } from "@firebase/messaging";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

async function getNotificationPermissionAndToken() {
    if(!("Notification" in window)){
        console.log('dont support');
        return null;
    };

    if(Notification.permission === 'granted'){
        return await fetchToken();
    };

    if(Notification.permission !== 'denied'){
        const permission = await Notification.requestPermission();
        if(permission === 'granted'){
            return await fetchToken();
        };
    };

    console.log('notification permission not granted !');
    return null;
};

const useFcmToken = ()=>{

    const router = useRouter();
    const [notificationPermissionStatus,setNotificationPermissionStatus] = useState<NotificationPermission | null>(null);
    const [token,setToken] = useState<string | null>(null);
    const retryLoadToken = useRef(0);
    const isLoading = useRef(false);

    const loadToken = async()=>{
        if(isLoading.current) return;

        isLoading.current = true;
        const token = await getNotificationPermissionAndToken();

        if(Notification.permission === 'denied'){
            setNotificationPermissionStatus('denied');
            console.log('denied !');

            isLoading.current = false;
            return;
        }

        if(!token){
            if(retryLoadToken.current >= 3){
                alert('Unable to load token, refresh the browser');
                console.log('3 times !');
                isLoading.current = false;
                return;
            };
    
            retryLoadToken.current += 1;
            console.log('retrying ...');
            isLoading.current = false;
            await loadToken();
            return;
        };

        setNotificationPermissionStatus(Notification.permission);
        setToken(token);
        isLoading.current = false;
    };

    useEffect(()=>{
       if("Notification" in window){
        (async()=> await loadToken())()
       } 
    },[]);

    useEffect(()=>{
        const setupListener = async()=>{
            if(!token) return;

            console.log('fcm token =>',token);

            const m = await messaging();
            if(!m) return;

            const unsubscribe = onMessage(m,(payload)=>{
                if(Notification.permission !== 'granted') return;

                console.log('foreground message =>',payload);

                const link = payload.data?.link || payload.notification?.title;

                if(link){
                    alert(`${payload.notification?.title} : ${payload.notification?.body}`);
                }else{
                    console.log('without link !');
                    alert(`${payload.notification?.title} : ${payload.notification?.body}`);
                };

                //* Disable this if you only want custom notification
                const n = new Notification(
                    payload.notification?.title || "New Message",
                    {
                        body: payload.notification?.body || "This is a new message",
                        data: link ? {url:link} : undefined
                    }
                );

                n.onclick = (event)=>{
                    event.preventDefault();
                    const link = (event.target as any)?.data?.url;
                    if(link){
                        router.push(link);
                    }else{
                        console.log('no link in push message !');
                    }
                }
            });

            return unsubscribe;
            
        }

        let unsubscribe: Unsubscribe | null = null;

        setupListener().then((unsub)=>{
            if(unsub){
                unsubscribe = unsub;
            }
        });

        return()=> unsubscribe?.();

    },[token,router]);

    return { token , notificationPermissionStatus };

   
};

export default useFcmToken;
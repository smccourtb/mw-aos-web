'use client';

import React, { useEffect, useRef, useState } from 'react';

import AppHeader from '@/components/header/AppHeader';
import ChatGPTSVG from '@/components/icons/ChatGPTSVG';
import Loader from '@/components/loader/Loader';

interface Message {
  role: string;
  content: string;
}

export default function Page() {
  const [messages, setMessage] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const addMessage = (role: string, content: string) => {
    setMessage((prevMessages) => [...prevMessages, { role, content }]);
  };

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (messages.length && lastMessage?.role === 'user') {
      setIsLoading(true);
      fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify(messages),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const { choices } = data;
          addMessage('assistant', choices[0].message.content);
          setIsLoading(false);
        });
    }
  }, [messages]);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 0);
  }, [messages]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(formRef.current as HTMLFormElement);
    const prompt = formData.get('prompt') || '';
    addMessage('user', prompt as string);
    formRef.current?.reset();
  };

  return (
    <div className="flex flex-col">
      <AppHeader />
      <div className="mx-auto mb-8 flex flex-col px-6 pb-16 text-sm lg:w-1/2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`justify-${
              message.role === 'user' ? 'end' : 'start'
            } flex`}
          >
            {message.role === 'user' ? (
              <span className="p-4">{message.content}</span>
            ) : (
              <span className="rounded-xl bg-gray-200 p-4">
                {message.content}
              </span>
            )}
          </div>
        ))}
        <Loader classNames="h-4 w-4 fill-blue-400" visible={isLoading} />
      </div>
      <div
        className="
          fixed
          bottom-0
          flex
          w-full
          justify-center
          bg-gradient-to-t
          from-white
          via-white
          to-transparent pt-12 pb-4
          text-sm"
      >
        <form
          autoComplete="off"
          className="flex w-full justify-center px-6"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <input
            autoFocus
            type="text"
            name="prompt"
            className="
              h-8
              w-full
              rounded-[8px]
              border
              border-gray-400
              p-2
              pl-10
              shadow-sm
              focus:ring-0
              lg:w-1/2
              lg:pl-7"
          />
          <button type="submit" className="fixed bottom-4 left-6 lg:left-1/4">
            <ChatGPTSVG className="h-8" />
          </button>
        </form>
      </div>
    </div>
  );
}

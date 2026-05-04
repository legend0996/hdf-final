export const getGreeting = (name: string) => {
  const hour = new Date().getHours();

  let greet = "Hello";

  if (hour < 12) greet = "Good morning";
  else if (hour < 18) greet = "Good afternoon";
  else greet = "Good evening";

  return `${greet}, ${name}`;
};
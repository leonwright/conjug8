interface ContainerProps {
  children: any;
}

export const Container = (props: ContainerProps) => {
  return (
    <div className="container mx-auto" style={{ height: '100vh' }}>
      {props.children}
    </div>
  );
};

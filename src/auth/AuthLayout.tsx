import { Outlet } from "react-router-dom";





const AuthLayout = () => {
 

 

 

  return (
    <div className=" w-full">
      <section className="flex h-screen bg-black items-center justify-center">
       <div className="flex-1">
       <Outlet>

</Outlet>

       </div>
       

        <img 
          className="w-[50%] xl:block hidden bg-no-repeat h-screen object-cover"
          src="/assets/images/side-img.svg"
          alt="Side illustration"
        />
      </section>
    </div>
  );
};

export default AuthLayout;

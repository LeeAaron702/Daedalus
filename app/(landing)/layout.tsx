import Footer from "@/components/footer";

const LandingLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return ( 
        <main className="h-full min-h-screen bg-[#0f3840] overflow-auto flex flex-col"> {/* Adjusted here */}
        <div className="mx-auto max-w-screen-xl w-full flex-grow"> 
            {children}
            </div>
            <Footer />
        </main>
     );
}
 
export default LandingLayout;
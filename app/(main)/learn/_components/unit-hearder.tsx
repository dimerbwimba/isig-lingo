

type Props = {
    description: string;
}

export const UnitHeader = ({ description }: Props) => {
    return (
        <header className=" items-center flex mb-8px mt-8px">
            <hr className=" box-content mt-[40px] mb-[40px] flex-grow basis-[48px] border-t-2 " />
            <h2 className="text-center mx-[16px] font-black text-muted-foreground">{description}</h2>
            <hr className=" box-content mt-[40px] mb-[40px] flex-grow basis-[48px] border-t-2 " />
        </header>
    )
}
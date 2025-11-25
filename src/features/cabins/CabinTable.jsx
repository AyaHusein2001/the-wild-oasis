import Spinner from "../../ui/Spinner";
import Menus from "../../ui/Menus";

import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";

const CabinTable = () => {
  const { cabins, isLoading } = useCabins();
  if (isLoading) return <Spinner />;
  console.log("🚀 ~ CabinTable ~ x:", cabins);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr" role="table">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={cabins}
          render={(cabin) => <CabinRow cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;

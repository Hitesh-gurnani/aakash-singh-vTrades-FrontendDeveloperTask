import * as React from "react";
import { useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";

function SendEth() {
  const { data: hash, isPending, sendTransaction } = useSendTransaction();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("submit");
    const formData = new FormData(e.target as HTMLFormElement);
    const to = formData.get("address") as `0x${string}`;
    const value = formData.get("value") as string;
    sendTransaction({ to, value: parseEther(value) });
  }

  return (
    <Card className="w-full max-w-md mx-auto p-6 shadow-md mt-5">
      <h2 className="text-2xl font-bold mb-6 text-center">Send ETH</h2>

      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="address">Recipient Address</Label>
          <Input
            id="address"
            name="address"
            placeholder="0xA0Cf…251e"
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="value">Amount (ETH)</Label>
          <Input
            id="value"
            name="value"
            placeholder="0.05"
            required
            className="w-full"
            type="number"
            step="0.001"
            min="0"
          />
        </div>

        <Button disabled={isPending} type="submit" className="w-full mt-6">
          {isPending ? "Confirming..." : "Send ETH"}
        </Button>

        {hash && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200">
            <p className="text-sm font-medium">Transaction Hash:</p>
            <p className="text-xs break-all text-gray-500 mt-1">{hash}</p>
          </div>
        )}
      </form>
    </Card>
  );
}

export default SendEth;

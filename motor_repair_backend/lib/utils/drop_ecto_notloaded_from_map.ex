defmodule MotorRepairBackend.Utils.DropEctoNotLoaded do
  # 在map中drop掉值为Ecto.Association.NotLoaded的字段
  def drop_ecto_not_loaded_from_map(map) do
    kl = map 
      |> Map.to_list 
      |> Enum.filter(fn({_, value}) -> 
        match?( %Ecto.Association.NotLoaded{__field__: _,__owner__: _,__cardinality__: _}, value)
      end)
      |> Enum.map(fn({key, _}) -> key end)
    Map.drop(map, kl)
  end
  
end
defimpl Poison.Encoder, for: Any do

  def encode(%{__struct__: _} = struct, options) do
    struct
      |> Map.from_struct
      |> sanitize_map
      |> MotorRepairBackend.Utils.DropEctoNotLoaded.drop_ecto_not_loaded_from_map
      |> Poison.Encoder.Map.encode(options)
  end
    
  defp sanitize_map(map) do
    Map.drop(map, [:__meta__, :__struct__])
  end

end
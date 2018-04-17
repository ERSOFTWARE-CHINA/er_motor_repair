defmodule MotorRepairBackendWeb.Utils.TranslateChangesetError do

  def translate_changeset_error(changeset) do
    Ecto.Changeset.traverse_errors(changeset, &translate_error/1)
  end

  defp translate_error({msg, opts}) do
    Enum.reduce(opts, msg, fn {key, value}, acc ->
      String.replace(acc, "%{#{key}}", to_string(value))
      end)
  end

end